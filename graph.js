class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2)
    v2.adjacent.add(v1)
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2)
    v2.adjacent.delete(v1)
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node in this.nodes){
      node.adjacent.delete(vertex)
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(vertex, visited = new Set(), arr = []) {
    if (!vertex){
      return null
    }
    visited.add(vertex)
    arr.push(vertex.value)

    for (let node of vertex.adjacent){
      if (!visited.has(node)){
        this.depthFirstSearch(node, visited, arr)
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(vertex, visited = new Set(), arr = []) {
    let queue = [vertex]
    visited.add(vertex)
    while (queue.length) {
      vertex = queue.shift();
      arr.push(vertex.value);

      for (let node of vertex.adjacent){
        if (!visited.has(node)) {
          visited.add(node);
          queue.push(node);
        }
      }
    }
    return arr
  }
}

module.exports = {Graph, Node}