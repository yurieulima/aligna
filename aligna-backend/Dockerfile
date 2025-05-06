# Usa a imagem oficial do Go
FROM golang:1.23.6

# Cria diretório da aplicação
WORKDIR /app

# Copia arquivos
COPY . .

# Instala dependências
RUN go mod tidy

# Compila o app
RUN go build -o main .

# Expõe a porta usada pelo Fiber
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["./main"]