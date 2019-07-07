var pageName = $('body').attr('name')

switch(pageName) {
	case 'index' : index(); break;
	case 'project' : project(); break;
	case 'news' : news(); break;
	case 'about' : about(); break;
	case 'contect' : contect(); break;
	default : funDefault(); break;
}

function index() {
	console.log('in index')
}

function project() {
	console.log('in project')
}

function news() {
	console.log('in news')
}

function about() {
	console.log('in about')
}

function contect() {
	console.log('in contect')
}

function funDefault() {
	console.log('in funDefault')
	// 每页通用的写这儿
}