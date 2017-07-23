import { h, Component } from 'preact';
import BasketItem from '../../components/basket/item';
import Section from '../../components/section';
import style from './style.scss';

// import cartData from '../../data';

export default class Home extends Component {

	onSectionToggle = () => {
		this.setState({
			sectionOpen: !this.state.sectionOpen
		});
	}

	onUpload = (event) => {
		const files = event.target.files;
		let uploads = [];
		
		for (let i = 0; i < files.length; i++) {
			uploads.push({
				name: files[i].name,
				quantity: 1,
				dimensions: {
					h: 0,
					w: 0,
					l: 0
				}
			});
		}

		this.setState({
			sectionOpen: true,
			designs: uploads.concat(this.state.designs)
		});
	}

	removeItem = (basketKey) => {
		let designs = this.state.designs;

		designs.splice(basketKey, 1);
		this.setState({
			designs
		});
	}

	updateQuantity = (basketKey, newQuantity) => {
		if (newQuantity < 1) {
			return;
		}

		let designs = this.state.designs;

		designs[basketKey].quantity = newQuantity;
		this.setState({
			designs
		});
	}

	constructor(props) {
		super(props);

		this.state = {
			designs: [],
			sectionOpen: false
		};
	}

	renderEmpty() {
		return (
			<div class="center p2">
				Upload designs above
			</div>
		);
	}

	renderItems() {
		return this.state.designs.map((item, index) => (
			<BasketItem
				removeItem={this.removeItem}
				basketKey={index}
				updateQuantity={this.updateQuantity}
				quantity={item.quantity}
				name={item.name}
				dimensions={item.dimensions}
			/>
		));
	}

	renderUploadZone() {
		return (
			<form class={`mb2 flex items-center ${style.upload}`}>
				<input
					id="files"
					multiple="multiple"
					type="file"
					name="upload"
					class={style.hide}
					onChange={this.onUpload}
				/>
				<label class={style.uploadLabel} for="files">
						Select a file to upload
				</label>
			</form>
		);
	}

	render({}, { sectionOpen, removingItem, designs }) {
		return (
			<div class={style.home}>
				{ this.renderUploadZone() }
				<Section open={sectionOpen} onToggle={this.onSectionToggle} title="Designs">
					{ designs.length > 0 ? this.renderItems() : this.renderEmpty() }
				</Section>
			</div>
		);
	}
}
