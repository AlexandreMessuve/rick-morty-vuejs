#!/usr/bin/env sh

# Arrête le script en cas d'erreur
set -e

# Installation des dépendances
npm install

# Construction du projet
npm run build

# Se déplacer dans le répertoire de sortie
cd dist

# Initialiser un dépôt Git si nécessaire
if [ ! -d ".git" ]; then
  git init
fi

# Ajouter les fichiers au dépôt
git add -A
git commit -m 'deploy'

# Vérifier si l'origine existe déjà
if git remote | grep origin; then
  git remote remove origin
fi

# Ajouter le dépôt distant
git remote add origin git@github.com:AlexandreMessuve/rick-morty.git
git branch -M main

# Pousser vers la branche main
git push -f origin main

# Retour au répertoire précédent
cd -

rm -rf dist
