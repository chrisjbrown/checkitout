import { h, Component } from 'preact';
import Icon from 'preact-material-components/Icon';
import style from './style.scss';

export default class Section extends Component {

	render({ name, dimensions, children, title, onToggle, open }) {
		return (
			<section
				class={`overflow-hidden rounded border ${style.section}`}
			>
				<div
					onClick={onToggle}
					class={`p2 bold ${style.title}`}
				>
					<Icon>{open ? 'keyboard_arrow_down' : 'keyboard_arrow_right'}</Icon>
					{title}
				</div>
				<div class={`${style.body} ${open ? style.open : ''}`}>
					{children}
				</div>
			</section>
		);
	}
}
