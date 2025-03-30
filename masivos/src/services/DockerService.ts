import Docker from "dockerode";

class DockerService {
  private static instance: DockerService;
  private docker: Docker;

  private constructor() {
    console.log("SOCKET_PATH_DOCKER:", process.env.SOCKET_PATH_DOCKER);
    const dockerhost = process.env.DOCKER_HOST_DEMON ?? 'host.docker.internal' ;
    
    this.docker = new Docker({
      protocol: "http",  // Asegura que use HTTP
      host: dockerhost, // Usa localhost
      port: 2375         // Puerto de Docker
    });
    //this.docker = new Docker({ socketPath: "/var/run/docker.sock" });
  }

  static getInstance(): DockerService {
    if (!DockerService.instance) {
      DockerService.instance = new DockerService();
    }
    return DockerService.instance;
  }

  getDocker(): Docker {
    return this.docker;
  }
}

export default DockerService;