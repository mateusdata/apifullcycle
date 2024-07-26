FROM grafana/grafana:latest

# Exponha a porta padrão do Grafana
EXPOSE 3000

# Defina volumes para persistência de dados
VOLUME ["/var/lib/grafana"]

# Defina o ponto de entrada padrão
CMD ["grafana-server", "--homepath=/usr/share/grafana"]
    