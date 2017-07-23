import { h, Component } from 'preact';
import Portal from 'preact-portal';
import Button from 'preact-material-components/Button';

import 'preact-material-components/Button/style.css';
import style from './style.scss';

export default class BasketItem extends Component {

	onRemove = () => {
		this.props.removeItem(this.props.basketKey);
	}

	toggleRemove = () => {
		this.setState({
			removingItem: !this.state.removingItem
		});
	}

	confirmRemove = () => {
		this.setState({
			removingItem: false
		});
		this.props.removeItem(this.props.basketKey);
	}

	constructor(props) {
		super(props);

		this.state = {
			removingItem: false
		};
	}

	render({ name, dimensions, quantity, updateQuantity, basketKey, removeItem }, { removingItem }) {
		return (
			<div class="mx1 clearfix p2 border-top flex flex-wrap items-center relative">
				<div>
					<img class={style.image} src="../../../assets/placeholder.png" />
				</div>
				<div class="mx1 flex-auto">
					{name}
					<div>
						<span>{dimensions.h} X {dimensions.w} X {dimensions.l}</span>
					</div>
				</div>
				<div class={`mx1 ${style.quantity}`}>
					<input
						type="button"
						value="-"
						onClick={() => updateQuantity(basketKey, quantity - 1)}
						class={`border ${style.quantityChange}`}
					/>
					<input
						class="mx1"
						type="number"
						onClick={(event) => updateQuantity(basketKey, event.currentTarget.value)}
						value={quantity}
					/>
					<input
						type="button"
						value="+"
						onClick={() => updateQuantity(basketKey, quantity + 1)}
						class={`border ${style.quantityChange}`}
					/>
				</div>
				<div>
					<i
						class={style.remove}
						onClick={this.toggleRemove}
					>
						X
					</i>
				</div>

				{
					removingItem &&
						<Portal into="body">
							<div class={style.portal} onClick={this.close}>
								<div class={style.modal}>
									<div class={`p2 ${style.modalBody}`}>
										<h4>Are you sure you want to remove this item?</h4>
										<div class="right-align">
											<Button
												onClick={this.toggleRemove}
												raised
											>
												Cancel
											</Button>
											<Button
												onClick={this.confirmRemove}
												className="ml1"
												raised
												primary
											>
												Confirm
											</Button>
										</div>
									</div>
								</div>
							</div>
						</Portal>
				}
			</div>
		);
	}
}
