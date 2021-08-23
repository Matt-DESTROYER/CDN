# Test.js
## Documentation/Features
```
Test.equals(a, b);
```
- `a`: One of the items being compared
- `b`: The other item being compared
- `caseSensitive`: If a string is input this allows the specification of whether the comparison should be case sensitive. (Defaults to true)
Checks if `a === b`. If arrays are input as parameters it compares each item in the arrays to check if they are the same. Performs deep comparison on objects to check if they are equal.
```
Test.similar(a, b, threshold, caseSensitive)
```
- `a`: One of the items being compared
- `b`: The other item being compared
- `threshold`: Percentage used to determine if `a` and `b` are satisfactorily similar
- `caseSensitive`: If a string is input this allows the specification of whether the comparison should be case sensitive. (Defaults to true)
Checks the similarity of `a` and `b` based on the threshold. First the percentage of similarity of `a` and `b` is found, then whether or not that satisfies the threshold is returned (`true` if `a` and `b` are more similar than the threshold).
