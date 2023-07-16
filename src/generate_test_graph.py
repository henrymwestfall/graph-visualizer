import json
import networkx as nx

graph = nx.watts_strogatz_graph(500, 10, 0.07)
edges = set()
for n in graph:
    for neighbor in graph.neighbors(n):
        edges.add(tuple(sorted((n, neighbor))))
data = {"edges": list(edges)}

with open("test_graph.json", "w") as f:
    json.dump(data, f)
