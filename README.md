# NationsTools – Log Analyzer Patterns

Ce dépôt fait partie de l’écosystème de l’association NationsTools.  
Il centralise les **patterns de logs** utilisés par l’API NationsTools afin de transformer des logs serveur bruts en données structurés exploitables pour la création de fiche récapitulatif ou de statistiques.

Ce dépôt est volontairement **générique**.  
Bien qu’il soit actuellement utilisé dans le contexte de serveurs NationsGlory (Java / Bedrock), tout serveur disposant de logs compatibles peut réutiliser ces schémas, y compris pour développer ses propres outils d’analyse.

## Objectif du dépôt

L’objectif de ce dépôt est de fournir une **source unique, versionnée et validée** de patterns YAML décrivant la structure des logs serveur.

Ces patterns permettent :
- L’identification automatique des actions sur le serveur
- L’extraction de données structurées (joueurs, pays, montants, coordonnées, objets, etc.)
- L’alimentation d’outils d’analyse, de statistiques, d’audit et de supervision

Le fichier YAML de ce dépôt est **directement ingéré par l’API NationsTools** après validation.

Toute modification acceptée impacte donc le comportement de l’analyseur côté API.

## Vue d’ensemble du fonctionnement

```

Logs serveur bruts
↓
Patterns YAML (ce dépôt)
↓
API NationsTools
(parsing & normalisation)
↓
Outils d’analyse / stats / audit

````

Ce dépôt ne contient **aucune logique applicative**, uniquement la description formelle des formats de logs attendus.

## Structure des patterns

Les patterns sont regroupés par **domaines fonctionnels** afin de faciliter la lecture, la maintenance et l’évolution.

Exemples de catégories :
- Commandes joueur
- Économie (HDV, banque, taxes, salaires)
- Factions / pays / relations
- PvP / combat
- Trade
- Missiles
- Homes
- Machines
- Inventaires
- Jobs / skills

Chaque pattern suit strictement le format suivant :

```yaml
nom_du_pattern:
  pattern: "ligne de log avec variables"
````

### Exemple

```yaml
hdv_sell:
  pattern: "{timestamp} [HDV] {player} vient de mettre en vente {qty}x ID:({itemid}) pour un prix unitaire de {unitprice} $/U (UUID:{uuid})"
```

Les variables entre `{}` sont utilisées par l’analyseur pour produire des données structurées.

---

## Exemples de logs reconnus

### Commande joueur

```log
2024-01-12 21:03:45 [INFO] Steve issued server command: /f home
```

### Vente HDV

```log
2024-01-12 18:22:10 [HDV] Alex vient de mettre en vente 32x ID:(264) pour un prix unitaire de 150 $/U (UUID:abcd-1234)
```

### Kill en wilderness

```log
2024-01-12 23:01:02 [Factions] KILL EN WILDERNESS DE John (France) sur Mike (Espagne)
```

---

## Public cible

Ce dépôt s’adresse principalement :

* Aux **administrateurs de serveurs**
* Aux **staffs techniques**
* À toute personne capable de :

  * Lire un log serveur
  * Modifier ou créer un fichier YAML
  * Utiliser GitHub (fork, commit, pull request)

Aucune compétence avancée en développement n’est requise.

## Contribution

Les contributions se font exclusivement via **GitHub**, par fork et pull request.

### Règles obligatoires

* Les noms de patterns doivent être explicites, en anglais, en `snake_case`
* Un pattern correspond à **un événement logique unique**
* Les patterns doivent être placés dans la **bonne catégorie fonctionnelle**
* Les variables doivent être cohérentes et explicites (`player`, `country`, `amount`, `itemid`, etc.)

### Modifications sensibles

* Toute modification d’un pattern existant doit être **justifiée**
* Les changements susceptibles de casser la rétro-compatibilité peuvent être refusés
* Les ajouts sont traités en priorité par rapport aux modifications destructives

Un workflow automatisé vérifie :

* La validité du YAML
* L’absence de clés dupliquées

## Validation et gouvernance

* Les Pull Requests sont validées par le **responsable technique de l’API NationsTools** sous la supervision du Bureau
* Une PR peut être **refusée sans justification détaillée**
* Délai indicatif de traitement : **7 jours**
* L’application effective dépend de la **prochaine mise à jour de l’API**

## Responsabilité et limitations

* Ce dépôt ne contient **aucune donnée personnelle réelle**
* Il ne contient que des **descriptions de formats de logs**
* Les logs peuvent varier selon :

  * Les plugins
  * Les versions serveur
  * Les configurations spécifiques

L’association NationsTools ne garantit pas la compatibilité universelle des patterns avec tous les serveurs.


## Licence

Ce projet est distribué sous **licence MIT**.

Les patterns peuvent être librement réutilisés, modifiés ou intégrés dans des outils tiers, sous réserve du respect de la licence.

## Améliorations possibles

* Harmonisation des variables entre catégories
* Extension à d’autres types de serveurs
* Traduction anglaise du README
