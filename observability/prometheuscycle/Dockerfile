# Use uma imagem base oficial do Prometheus
FROM prom/prometheus:latest

# Copie o arquivo de configuração do Prometheus para o container
COPY prometheus.yml /etc/prometheus/prometheus.yml

# Exponha a porta 9090 que o Prometheus usa por padrão
EXPOSE 9090

#VOLUME [ "/prometheus" ]
# Comando para iniciar o Prometheus
CMD ["--config.file=/etc/prometheus/prometheus.yml"]
