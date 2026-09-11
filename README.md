# MutuaMente Psicologia - Website Oficial

Website estático e independente da clínica de psicologia **MutuaMente**, fundada pela **Dra. Sofia Godinho Cabrita** (Cédula OPP n.º 15786).

Este projeto é uma Single Page Application desenvolvida em React + Vite + Tailwind CSS e **não necessita de qualquer servidor/backend externo**. Funciona a 100% de forma estática no **GitHub Pages**.

---

## 🚀 Como Ativar o GitHub Pages Corretamente

O erro de página em branco com **`main.tsx (404)`** acontece quando o GitHub Pages está configurado para servir a branch `main` diretamente (código-fonte não compilado).

Para corrigir e colocar o site online, escolha uma das duas opções abaixo:

### OPÇÃO A (Recomendada - Totalmente Automática via GitHub Actions)
1. No seu repositório no GitHub (`MutuaMente-Psicologia-V2.0`), clique em **Settings** (Definições no topo).
2. No menu lateral esquerdo, clique em **Pages**.
3. Na secção **Build and deployment**:
   - No menu **Source**, mude de *"Deploy from a branch"* para **GitHub Actions**.
4. Envie as alterações mais recentes para o GitHub (`git push origin main`). O GitHub Actions compilará e publicará o site automaticamente!

---

### OPÇÃO B (Publicação direta com 1 comando via terminal)
Caso prefira compilar no seu computador e enviar já pronto:
```bash
npm install
npm run deploy
```
Este comando compila o projeto e envia a pasta `dist` pronta para a branch `gh-pages`.
Depois, nas definições do GitHub Pages (**Settings > Pages**), basta manter **"Deploy from a branch"** e escolher a branch **`gh-pages`** (pasta `/ root`).

---

## 🛠️ Comandos Locais de Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Compilar para produção (pasta ./dist)
npm run build

# Publicar diretamente para o GitHub Pages
npm run deploy
```
