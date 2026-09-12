# Site Ortomed, Vilhena/RO

Landing page institucional da Ortomed (Ortopedia, Traumatologia e Cirurgia), em HTML/CSS/JS puro, sem build, sem dependências.

## Rodar

```bash
python -m http.server 5599
```

Depois abra http://localhost:5599

## Estrutura

```
index.html          página única (hero, clínica, equipe, especialidades,
                    depoimentos, estrutura, contato + mapa, Pix)
css/styles.css      design system (variáveis de cor, tipografia, responsivo)
js/main.js          menu mobile, animação de entrada, copiar código Pix
assets/img/         imagens extraídas do material oficial da clínica
assets/img/pix-qr.svg  QR Code Pix gerado a partir do BR Code oficial
assets/video/tour.mp4  loop mudo de 11s (hero + seção Estrutura)
assets/video/ortomed.mp4  vídeo original da clínica, sem cortes (com áudio)
```

## Paleta

| Token | Cor | Uso |
|---|---|---|
| `--brown-900` | `#150d06` | fundo escuro principal |
| `--brown-700` | `#2a1c0d` | blocos e faixas |
| `--gold-500` | `#c9a24a` | destaque, botões, detalhes |
| `--gold-300` | `#e6cd94` | títulos em fundo escuro |
| `--beige` | `#f4ece0` | fundo bege da primeira seção (hero + header) |
| `--cream` | `#faf7f1` | fundo claro das demais seções |
| `--gold-700` | `#96701f` | dourado legível sobre fundo claro |

Tipografia: **Fraunces** (títulos, variável, com eixos `SOFT`/`WONK` para o traço
editorial) + **Instrument Sans** (textos, descrições e rótulos).

Textura: grão em `assets/img/grain.png`, aplicado em `body::after` sobre a página
inteira com `mix-blend-mode: multiply`.

Aurora dourada: quatro `.blob` desfocados (`filter: blur`) dentro de `.hero__aurora`.
Sem tons avermelhados, só azul, dourado e âmbar.

## Vídeos

`assets/video/tour.mp4` foi montado a partir do vídeo de fundo oficial do link-in-bio
da clínica (`ortomed.mp4`, 38s, com áudio). Ficaram só os trechos de fachada, interior
e totem do logo: a parte da festa de inauguração (pessoas e comida) foi cortada.
O arquivo final tem 11s, é vertical (720x1280), **sem faixa de áudio** e roda em loop
automático (`autoplay muted loop playsinline`) no hero e na seção Estrutura.

Para trocar o vídeo depois, substitua `tour.mp4` mantendo o formato vertical e sem áudio,
e gere um novo poster (`tour-poster.jpg`).

## Dados usados

Extraídos do link-in-bio oficial (beacons.ai/ortomed.vilhena) e das artes do Instagram
@ortomedatividadesmedicas:

- Dr. Rui Ramos, CRM/RO 3472 · RQE 2052, Ortopedia e Traumatologia, (69) 99269-2005
- Dr. Fábio Yonamine, CRM/MT 4160 · RQE 2837 · RQE 5168, Bariátrica / Aparelho Digestivo / Geral
- Dra. Camila Muniz, CRM/MT 8412 · RQE 5392 · CRM/RO 4125 · RQE 3048, Cirurgia Geral, (69) 99264-1628
- Endereço: Av. Pres. Nasser, 785, Jardim das Oliveiras, Vilhena/RO

> **Atenção:** o link-in-bio informa o número **785** e uma arte mais recente do Instagram
> informa **793**. Confirmar com a clínica e ajustar em `index.html` (4 ocorrências).

## Pix

Chave e BR Code retirados da própria página oficial de Pix da clínica
(multlinks.com/ortomedvha, linkada no beacons como "CHAVE PIX"):

- Chave CNPJ: `61.031.445/0001-23`
- Beneficiário no payload: `ORTOMED VILHENA`
- BR Code copia e cola: atributo `data-pix` do botão `#pix-copy` em `index.html`

O QR (`assets/img/pix-qr.svg`) foi gerado localmente a partir desse mesmo BR Code.
Se a clínica trocar a chave, basta atualizar o `data-pix`, o texto `#pix-key` e
regerar o SVG.

## Pontos em aberto

> **Depoimentos são EXEMPLOS.** Os 3 cards da seção `#depoimentos` foram escritos
> apenas para mostrar o layout. Substitua pelos depoimentos reais de pacientes
> (ou pelas avaliações do Google) antes de publicar o site.

- Horário de funcionamento (não divulgado nos canais), sugerido incluir na seção Contato.
- Convênios atendidos.
- Fotos individuais dos médicos em alta resolução (as atuais foram recortadas de posts).
- Confirmar com a clínica se a chave Pix publicada continua válida.
- Não há formulário: todo o contato é por WhatsApp, e a localização usa mapa embutido
  do Google Maps.
