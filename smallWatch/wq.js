var longestPalindrome = function(s) {
    var left = 0
    var right = 0
    var max = 0

    for (let i = 0; i < s.length; i++) {
        var a = 1
        while (i-a>0&&i+a<s.length) {
            if (s[i-a] == s[i+a]) {
                if (max > 2 * a + 1) {
                    max = 2 * a + 1
                    left = i - a
                    right = i + a
                }
                a ++
            }else {
                a = 1
            }
        }     
    }
    return s.substring(left, right)
};