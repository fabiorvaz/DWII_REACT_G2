/**
 * 
 */
var LinhaBox = React.createClass({
	onLinhaSelecionada: function(id){
		var rows = this.state.data.filter(function(elem) {
			return elem.id = id;
        });
		this.setState({linhaSelecionada:rows});
	},
	getInitialState: function() {
	    return {data: data, linhaSelecionada: []};
	},
	render: function() {
		return (
			<div>
				<div>
					<LinhaLista data={this.state.data} onLinhaSelecionada={this.onLinhaSelecionada} />
				</div>
				<div>
					<Linha linha={this.state.linhaSelecionada} />
				</div>
			</div>
		);
	}
});

var LinhaLista = React.createClass({
	handleChange: function(e){
		this.props.onLinhaSelecionada(e.target.value);
	},
	render: function() {
		var linhasNodes = this.props.data.map(function(linha)
			{
				return (
					<option value={linha.id} key={linha.id}>{linha.nome} </option>
				);
			}
		);
		return (
				<form onChange={this.handleChange}>
					<select>
						{linhasNodes}
					</select>
				</form>
				);
	}
});

var Linha = React.createClass({
	render: function()
	{
		return(
			<table>
				<tbody>
					<tr>
						<td>id</td>
						<td>{this.props.linha.id}</td>
					</tr>
					<tr>
						<td>nome</td>
						<td>{this.props.linha.nome}</td>
					</tr>
					<tr>
						<td>origem</td>
						<td>{this.props.linha.origem}</td>
					</tr>
					<tr>
						<td>destino</td>
						<td>{this.props.linha.destino}</td>
					</tr>
					<tr>
						<td>tempo medio</td>
						<td>{this.props.linha.tempoMedio}</td>
					</tr>
					<tr>
						<td>valor</td>
						<td>{this.props.linha.valor}</td>
					</tr>
				</tbody>
			</table>
		);
	}
})

var data = [ {id:"1", nome: "Florida", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:50",valor:"4.50"},
 {id:"2", nome: "Colina", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:30",valor:"4.70"},
 {id:"3", nome: "Sans Souci", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:55",valor:"3.50"}];
//pollInterval={10000}
ReactDOM.render(
	<LinhaBox data={data} />,
	document.getElementById('content')
);