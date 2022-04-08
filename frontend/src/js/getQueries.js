function getQueries() {
    let queryStr = window.location.search.slice(1), // 文頭?を除外
        queries = {};

    // クエリがない場合は空のオブジェクトを返す
    if (!queryStr) return queries;

    // クエリ文字列を & で分割して処理
    queryStr.split('&').forEach(function(queryStr) {
        // = で分割してkey,valueをオブジェクトに格納
        let queryArr = queryStr.split('=');
        queries[queryArr[0]] = queryArr[1];
    });

    return queries;
}

export default getQueries;