# Utiliser une image de base légère pour Node.js
FROM node:14-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application fonctionne
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["node", "app.js"]
