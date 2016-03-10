var searchTerm;
var nextPageToken;
var prevPageToken;

$(function () {

	$('#search-term').submit(function (event) {
		searchTerm = $('#query').val();
		getRequest(searchTerm);
		return false;
	})

	$('#next').click(function () {
		getRequest(searchTerm, nextPageToken);
	});

	$('#prev').click(function () {
		getRequest(searchTerm, prevPageToken);
	});

});

function getRequest(searchTerm, pageToken) {
	var params = {
		part: 'snippet',
		key: 'AIzaSyBA2B4xXFl6X_CPKVtnbjncfocmZBAz5d4',
		q: searchTerm,
		type: 'video',
		pageToken: pageToken
	};
	$.getJSON('https://www.googleapis.com/youtube/v3/search', params, function (data) {
		showResults(data.items);
		nextPageToken = data.nextPageToken;
		prevPageToken = data.prevPageToken;
		if (nextPageToken) {
			$('#next').show();
		} else {
			$('#next').hide();
		}
		if (prevPageToken) {
			$('#prev').show();
		} else {
			$('#prev').hide();
		}
	})
}

function showResults(results) {
	var html = '';
	$.each(results, function(index, value) {
		var snippet = value.snippet;
		html +=
		'<li>' +
			'<a href="https://www.youtube.com/watch?v=' + value.id.videoId + '" target="_blank">' +
				'<h2>' + snippet.title + '</h2>' +
				(snippet.description ? '<p>' + snippet.description + '</p>' : '') +
				'<img src = "' + snippet.thumbnails.default.url + '"' +
					' width = "' +snippet.thumbnails.default.width + 'px"' +
					' height = "' +snippet.thumbnails.default.height + 'px"' +
				'/>' +
			'</a>' +
		'</li>';
	});

	$('#search-results').html(html);
}