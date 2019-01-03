import Quill from 'quill'
let Parchment = Quill.import('parchment')
class StrikeStyleAttributor extends Parchment.Attributor.Style {
	value(node) {
		return super.value(node)
	}
	add(node, value) {
		node.style.setProperty('text-decoration', 'line-through');
		return true;
	}
	remove(node) {
		node.style.removeProperty('text-decoration');
	}
}
let StrikeStyle = new StrikeStyleAttributor('strike', 'text-decoration', {
	scope: Parchment.Scope.INLINE,
	whitelist: [true, false]
});

export default StrikeStyle;
