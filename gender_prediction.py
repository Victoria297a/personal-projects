try:
	from sklearn.tree import DecisionTreeClassifier
except ImportError:
	print("scikit-learn is not installed. Install it with: pip install scikit-learn")
	raise


def main():
	x = [[164, 64, 38], [189, 89, 43], [130, 40, 35], [160, 80, 40], [123, 30, 31], [192, 96, 44]]
	y = ['female', 'male', 'kid', 'female', 'kid', 'male']

	clf = DecisionTreeClassifier()
	clf.fit(x, y)

	prediction = clf.predict([[128, 29, 33]])
	print(prediction)


if __name__ == '__main__':
	main()