# MutuaMente Psicologia - Website Oficial

Website estático e independente da clínica de psicologia **MutuaMente**, fundada pela **Dra. Sofia Godinho Cabrita** (Cédula OPP n.º 15786).

Este projeto é 100% estático (Single Page Application desenvolvida em React + Vite + Tailwind CSS) e **não necessita de Netlify, Vercel ou qualquer servidor/backend externo**. Todo o código e armazenamento clínico funcionam diretamente no browser (armazenamento local protegido por palavra-passe e envio de confirmações por EmailJS) e é ideal para ser alojado diretamente no **GitHub Pages** de forma gratuita e sem limites.

---

## 🚀 Como Alojamento no GitHub Pages (Sem Entidades Externas)

O projeto já inclui um fluxo automatizado de publicação (**GitHub Actions**) localizado em `.github/workflows/deploy.yml`.

### Passo 1: Enviar o código para o seu repositório no GitHub
Se ainda não enviou, efetue o `push` do repositório para o GitHub:
```bash
git add .
git commit -m "Publicação MutuaMente Psicologia"
git push origin main
```

### Passo 2: Ativar o GitHub Pages no Repositório
1. No seu repositório no GitHub, clique no separador **Settings** (Definições).
2. No menu lateral esquerdo, clique em **Pages**.
3. Em **Build and deployment** > **Source**, selecione:
   - **GitHub Actions**
4. É tudo! O GitHub executará automaticamente o fluxo e o site ficará imediatamente publicado em:
   - `https://<o-seu-utilizador>.github.io/<nome-do-repositorio>/` (ou no seu domínio próprio, se associar um).

---

## 🛠️ Comandos Locais de Desenvolvimento

Caso pretenda testar ou compilar localmente:

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Compilar para produção (gera pasta estática ./dist)
npm run build
```

---

## 📋 Funcionalidades Incluídas
- **100% Autónomo**: Sem necessidade de bases de dados externas, servidores node ou planos de alojamento pagos.
- **Marcação de Consultas**: Fluxo interativo de marcação com validação de horários e prevenção de sobreposições.
- **Painel Clínico Reservado**: Gestão de consultas, notas clínicas e estados, protegido por palavra-passe e guardado de forma segura no browser.
- **Design Responsivo & Identidade**: Tipografia Bellefair + Roboto, paleta com dourado ocre (`#CD8E33`) e cinzento carvão (`#545454`).
