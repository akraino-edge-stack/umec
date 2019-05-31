FROM docker.io/opensuse/tumbleweed

RUN zypper --non-interactive install systemd man file which openssl git podman iptables
RUN useradd --create-home --password $(openssl passwd -1 tapio) tapio

RUN git clone --depth 1 https://github.com/rancher/k3s.git


CMD ["/bin/bash"]

