workflow "New workflow" {
  on = "push"
  resolves = ["Docker Tag"]
}

action "GitHub Action for Docker" {
  uses = "actions/docker/cli@76ff57a"
  args = "build -t demo:latest ."
}

action "Docker Tag" {
  uses = "actions/docker/tag@76ff57a"
  needs = ["GitHub Action for Docker"]
}
