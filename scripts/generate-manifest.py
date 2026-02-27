#!/usr/bin/env python3
"""
Gera o manifest.json do Hub CSV automaticamente.

Percorre o repositório para descobrir todos os ativos de conhecimento,
calcula hashes SHA256 e atribui prioridades com base na localização.

Executado automaticamente pelo GitHub Actions a cada deploy.
"""

import json
import hashlib
import os
import sys
from datetime import datetime, timezone

# Diretório raiz do repositório (pode ser passado como argumento)
REPO_ROOT = sys.argv[1] if len(sys.argv) > 1 else "."

# Regras de prioridade por caminho (menor número = maior prioridade)
PRIORITY_RULES = [
    ("llms.txt",                          0, "entrypoint"),
    ("completeness-checklist.md",         1, "meta"),
    ("docs/_infra/csv-core/definition",   2, "core"),
    ("docs/_infra/csv-core/identity",     3, "core"),
    ("docs/_infra/assets/logo-usage",     4, "core"),
    ("docs/_infra/axiacare/",             5, "mandate"),
    ("docs/_infra/medvalor/",             6, "mandate"),
    ("docs/_infra/thera/",                7, "mandate"),
    ("docs/_infra/csv-core/",             8, "core"),
    ("docs/_infra/assets/",               9, "assets"),
    ("docs/_infra/standards/",           10, "standards"),
    ("docs/_infra/",                     11, "infra"),
]

# Arquivos e diretórios a ignorar
IGNORE_PATTERNS = [
    "node_modules",
    ".git",
    ".vitepress",
    "scripts/",
    "manifest.json",
    "package",
    ".github",
]

# Descrições automáticas por tag
TAG_DESCRIPTIONS = {
    "entrypoint": "Ponto de entrada para agentes de IA com instruções iniciais e links para os artefatos de conhecimento.",
    "meta": "Artefato de meta-governança para consumo estruturado por agentes de IA.",
    "core": "Documento fundamental do ecossistema Grupo CSV.",
    "mandate": "Mandato institucional que define escopo de atuação e relação com o ecossistema.",
    "assets": "Catálogo ou guia de assets visuais do ecossistema.",
    "standards": "Padrão ou diretriz de compliance e governança.",
    "infra": "Documento de infraestrutura cognitiva do Hub.",
}


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(8192), b""):
            h.update(chunk)
    return h.hexdigest()


def should_ignore(rel_path):
    for pattern in IGNORE_PATTERNS:
        if pattern in rel_path:
            return True
    return False


def get_priority_and_tag(rel_path):
    for prefix, priority, tag in PRIORITY_RULES:
        if prefix in rel_path:
            return priority, tag
    return 99, "other"


def make_id(rel_path):
    """Gera um ID legível a partir do caminho relativo."""
    name = rel_path.replace("docs/_infra/", "").replace("docs/", "")
    name = name.replace("/", "-").replace(".md", "").replace(".txt", "")
    name = name.strip("-")
    return name


def make_title(rel_path):
    """Gera um título legível a partir do nome do arquivo."""
    basename = os.path.basename(rel_path)
    name = basename.replace(".md", "").replace(".txt", "")
    return name.replace("-", " ").replace("_", " ").title()


def discover_assets(repo_root):
    """Descobre todos os arquivos .md e .txt relevantes no repositório."""
    assets = []

    # 1. Arquivos raiz de IA
    for fname in ["llms.txt", "completeness-checklist.md"]:
        fpath = os.path.join(repo_root, fname)
        if os.path.isfile(fpath):
            assets.append(fname)

    # 2. Todos os .md dentro de docs/_infra/
    infra_dir = os.path.join(repo_root, "docs", "_infra")
    if os.path.isdir(infra_dir):
        for root, dirs, files in os.walk(infra_dir):
            for f in sorted(files):
                if f.endswith(".md"):
                    rel = os.path.relpath(os.path.join(root, f), repo_root)
                    if not should_ignore(rel):
                        assets.append(rel)

    return assets


def main():
    repo_root = os.path.abspath(REPO_ROOT)
    os.chdir(repo_root)

    discovered = discover_assets(repo_root)

    knowledge_assets = []
    for rel_path in discovered:
        priority, tag = get_priority_and_tag(rel_path)
        file_hash = sha256_file(rel_path)

        asset = {
            "id": make_id(rel_path),
            "priority": priority,
            "title": make_title(rel_path),
            "path": f"/{rel_path}",
            "sha256": file_hash,
            "description": TAG_DESCRIPTIONS.get(tag, "Documento do Hub CSV."),
            "tags": [tag],
        }
        knowledge_assets.append(asset)

    # Ordenar por prioridade
    knowledge_assets.sort(key=lambda a: (a["priority"], a["path"]))

    manifest = {
        "manifestVersion": "1.0.0",
        "lastUpdated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "totalAssets": len(knowledge_assets),
        "knowledgeAssets": knowledge_assets,
    }

    output_path = os.path.join(repo_root, "manifest.json")
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"manifest.json gerado com {len(knowledge_assets)} ativos.")


if __name__ == "__main__":
    main()
