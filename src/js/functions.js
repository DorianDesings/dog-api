import { URL } from './constants';
import {
	breedsSelectElement,
	dogImageElement,
	subBreedsSelectElement
} from './dom';
import { fetchData } from './utils';
let allBreeds;
let breedSelected;
let subBreedSelected;

export const setSubBreed = event => {
	const subBreed = event.target.value;
	if (subBreed === 'default') return;
	subBreedSelected = event.target.value;
};

export const printOptions = (options, selectElement) => {
	const fragment = document.createDocumentFragment();
	if (options.length > 1 && selectElement === subBreedsSelectElement) {
		selectElement.textContent = '';
		const firstOption = document.createElement('option');
		firstOption.value = 'default';
		firstOption.textContent = 'Selecciona una subraza';
		fragment.append(firstOption);
	}

	for (const option of options) {
		const newOption = document.createElement('option');
		newOption.value = option;
		newOption.textContent = option;
		fragment.append(newOption);
	}

	selectElement.append(fragment);
};

export const getAllBreeds = async () => {
	allBreeds = await fetchData(URL.allBreeds);
	const allBreedsList = Object.keys(allBreeds.message);
	printOptions(allBreedsList, breedsSelectElement);
};

export const checkSubBreeds = event => {
	const breed = event.target.value;
	subBreedSelected = undefined;
	breedSelected = breed;
	console.log(allBreeds.message[breed]);
	if (breed === 'default' || allBreeds.message[breed].length === 0) {
		subBreedsSelectElement.parentElement.classList.add('hide');
		return;
	}

	printOptions(allBreeds.message[breed], subBreedsSelectElement);
	subBreedsSelectElement.parentElement.classList.remove('hide');
};

const printDogImage = dogImage => {
	if (!dogImage) return;
	dogImageElement.src = dogImage;
};

export const getImage = async () => {
	let imageRequest;
	if (!breedSelected) return;

	if (subBreedSelected) {
		imageRequest = await fetchData(
			`https://dog.ceo/api/breed/${breedSelected}/${subBreedSelected}/images/random`
		);
	} else {
		imageRequest = await fetchData(
			`https://dog.ceo/api/breed/${breedSelected}/images/random`
		);
	}

	printDogImage(imageRequest.message);
};
