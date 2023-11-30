import {
	breedsSelectElement,
	buttonImageElement,
	subBreedsSelectElement
} from './dom';
import {
	checkSubBreeds,
	getAllBreeds,
	getImage,
	setSubBreed
} from './functions';

getAllBreeds();

breedsSelectElement.addEventListener('change', checkSubBreeds);
subBreedsSelectElement.addEventListener('change', setSubBreed);
buttonImageElement.addEventListener('click', getImage);
