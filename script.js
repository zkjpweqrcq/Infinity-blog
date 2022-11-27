const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.querySelector('#filter');

let limit = 5;
let page = 1;

async function getPosts() {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
	);

	const data = await res.json();
	
	return data;
}

async function showPosts() {
	const posts = await getPosts();
	posts.forEach(post => {
		const postEl = document.createElement('div');
		postEl.classList.add('post'); // добавить сюда класс post
		postEl.innerHTML = `
			<div class="number">${post.id}</div>
			<div class="post-info">
				<h2 class="post-title">${post.title}</h2>
				<p class="post-body">${post.body}</p>
			</div>
		`;
		postsContainer.appendChild(postEl);
	});
}
showPosts();

function showLoading() {
	//добавить класс show в loading
	loading.classList.add('show');

	setTimeout(() => {
			//убираем класс show в loading
			loading.classList.remove('show');
			setTimeout(() => {
					// увеличиваем страницу на 1
					page++;
					showPosts();
			}, 300)
	}, 1000)
}

window.addEventListener('scroll', () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	
	console.log("scrollTop", scrollTop);
	console.log("scrollHeight", scrollHeight);
	console.log("clientHeight", clientHeight);
	console.log("------------------");

	if (scrollHeight - scrollTop <= clientHeight + 1) {
		showLoading();
	}
});


function filterPosts(e) {
	console.log(e.target.value);
	const term = e.target.value.toLowerCase();
	const posts = document.querySelectorAll('.post');

	posts.forEach(post => {
		const title = post.querySelector('.post-title').innerText.toLowerCase();
		const body = post.querySelector('.post-body').innerText.toLowerCase();

		if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
			post.style.display = 'flex';
		} else {
			post.style.display = 'none';
		}
	})
}

filter.addEventListener('input', filterPosts);

//  TODO
// * filterPosts
// * show new posts on user scroll
