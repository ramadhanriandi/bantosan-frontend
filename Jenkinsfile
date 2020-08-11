pipeline {
  agent {
    docker {
      image 'node'
    }
  }
  stages {
    stage('Clone Sources') {
      steps {
        git 'https://github.com/ramadhanriandi/bantosan-frontend.git'
      }
    }
    stage('Information') {
      steps {
        sh 'node -v'
        sh 'npm -v'
      }
    }
    stage('Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('Staging') {
      steps {
        sh 'npm i -g http-server'
      }
    }
    stage('Deploy') {
      steps {
        sh 'http-server ./dist'
      }
    }
  }
}