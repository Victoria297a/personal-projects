from sklearn import tree
print('tree type:', type(tree))
print('DecisionTreeClassifier exists:', hasattr(tree, 'DecisionTreeClassifier'))
print('tree module file:', getattr(tree, '__file__', None))
