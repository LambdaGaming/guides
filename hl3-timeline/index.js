const infoTypes = [
	"official",
	"discovery",
	"leak",
	"speculation",
	"hoax",
	"community"
]

let timeline = []

function LoadTimeline() {
	fetch( "https://lambdagaming.github.io/guides/hl3-timeline/timeline.json" )
		.then( response => response.json() )
		.then( json => {
			timeline = json;
			ShowTimeline();
		} );
}

function ShowTimeline( filter ) {
	var right = false;
	var lastDate = "";
	var container = document.getElementById( "eventList" );
	var showing = document.getElementById( "showing" );
	var count = 0;
	if ( filter != null ) {
		var list = document.getElementsByClassName( "event" );
		while ( list.length > 0 ) {
			list[0].remove();
		}
	}
	for ( const t of timeline ) {
		if ( filter != null && filter != t.type ) {
			continue;
		}
		var event = document.createElement( "div" );
		event.className = "event"
		var dot = document.createElement( "div" );
		dot.className = "dot";
		event.append( dot );
		var eventBox = document.createElement( "div" );
		eventBox.className = "eventBox";
		var header = document.createElement( "div" );
		header.className = "header";
		var type = document.createElement( "span" );
		type.className = "type";
		type.innerText = infoTypes[t.type];
		type.setAttribute( "data-type", infoTypes[t.type] );
		header.append( type );
		var date = document.createElement( "span" );
		date.className = "date";
		date.innerText = t.date;
		header.append( date );
		eventBox.append( header );
		var title = document.createElement( "h4" );
		var link = document.createElement( "a" );
		link.className = "title";
		link.href = t.url;
		link.target = "_blank";
		link.rel = "noopener noreferrer";
		link.innerText = t.title;
		title.append( link );
		eventBox.append( title );
		var info = document.createElement( "p" );
		info.className = "desc";
		info.innerText = t.info;
		eventBox.append( info );
		event.append( eventBox );
		container.append( event );

		if ( t.date != lastDate && lastDate != "" ) {
			right = !right;
		}
		if ( right ) {
			event.className += " right";
		}
		lastDate = t.date;
		count++;
	}
	showing.innerText = `Showing ${count}/${timeline.length} Events`;
}

document.addEventListener( "DOMContentLoaded", function() {
	LoadTimeline();
} )
