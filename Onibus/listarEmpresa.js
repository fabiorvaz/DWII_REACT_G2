/**
 * 
 */
var EmpresaBox = React.createClass({
	render: function() {
		return (
				<EmpresaLista data={this.props.data} />
		);
	}
});

var EmpresaLista = React.createClass({
	render: function() {
		var empresasNodes = this.props.data.map(function(empresa)
			{
				return (
					<Empresa id={empresa.id} nome={empresa.nome} />
				);
			}
		);
		return (
				<table>
					<thead>
						<tr>
							<th>
								Código
							</th>
							<th>
								Nome
							</th>
						</tr>
					</thead>
					<tbody>
						{empresasNodes}
	    			</tbody>
				</table>
				);
	}
});

var Empresa = React.createClass({
	render: function()
	{
		return(
			<tr>
				<td>{this.props.id}</td>
				<td>{this.props.nome}</td>
			</tr>
		);
	}
})


var data = [ {id:"1", nome: "Expresso rio guaíba"}, {id:"2", nome: "Sogal"},{id:"3", nome: "Viação pelicano"}];
//pollInterval={10000}
ReactDOM.render(
	<EmpresaBox data={data} pollInterval={200} />,
	document.getElementById('content')
);