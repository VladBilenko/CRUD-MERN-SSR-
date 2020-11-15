node {

  checkout scm
  def dockerImage

  stage('Build image') {
    dockerImage = docker.build("momasha/mern:v2")
  }

  stage('Push image') {
    docker.withRegistry('https://hub.docker.com/', 'docker-hub-credentials') {
      dockerImage.push()
    }
  }

}
