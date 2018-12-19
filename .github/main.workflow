workflow "New workflow" {
  on = "push"
  resolves = ["npm"]
}

action "npm" {
  uses = "actions/npm@c555744"
}
