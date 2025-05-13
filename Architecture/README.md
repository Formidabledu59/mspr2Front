# 🧱 Générateur d’Architecture de Projet

Ce dossier contient un script Node.js qui génère automatiquement un fichier `architecture.txt` représentant l’arborescence complète de ton projet.

---

## 📂 Emplacement du script

Le script est situé ici :

```
Architecture/generateArchitecture.js
```

---

## ▶️ Comment l’utiliser

Depuis la **racine du projet**, exécute cette commande dans ton terminal :

```
node Architecture/generateArchitecture.js
```

---

## 📝 Résultat attendu

Un fichier `architecture.txt` sera généré à la **racine du projet** avec une structure similaire à :

```
.
├── src
│   ├── app
│   │   ├── app.component.ts
│   │   └── ...
├── package.json
├── angular.json
└── architecture.txt
```

---

## 🚫 Dossiers ignorés automatiquement

Le script ignore par défaut les dossiers suivants :

* `node_modules`
* `.git`
* `Architecture` (lui-même)

---

## 💡 Astuce bonus

Tu peux ajouter cette ligne dans ton `package.json` pour lancer le script avec `npm` :

```json
"scripts": {
  "archi": "node Architecture/generateArchitecture.js"
}
```

Puis tu l'exécutes simplement avec :

```
npm run archi
```

---

## 👤 Auteur

Script pensé pour documenter automatiquement les projets JavaScript/Node.
