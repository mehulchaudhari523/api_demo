var compareKeys = (a, b) => {
    var aKeys = Object.keys(a);
    //var bKeys = b.sort();
    var missing = b.filter((i => a => a !== aKeys[i] || !++i)(0))
    return missing;
}

module.exports = compareKeys;