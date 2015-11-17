var LinhaBox = React.createClass({
	handleAddSubmit: function(id, nome, linha) {
	    var linhas = this.state.data;
	    var newLinhas = linhas.concat([linha]);
	    this.setState({data: newLinhas});
		/*
		$.ajax({
		      url: "services/library/book/"+isbn+"?title="+title,
		      dataType: 'json',
		      type: 'PUT',
		      success: function(data) {
		        this.setState({data: data});
		      }.bind(this),
		      error: function(xhr, status, err) {
		        console.error(this.props.url, status, err.toString());
		      }.bind(this)
		    });*/
	},
	getInitialState: function() {
	    return {data: data};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormAdicionar onLinhaSubmit={this.handleAddSubmit} />
				</div>
				<div>
					<LinhaLista data={this.state.data} />
				</div>
			</div>
		);
	 }
});

var LinhaLista = React.createClass({
	render: function() {
		var linhasNodes = this.props.data.map(function(linha)
			{
				return (
					<Linha linha={linha} />
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
							<th>
								Origem
							</th>
							<th>
								Destino
							</th>
							<th>
								Tempo m&eacute;dio
							</th>
							<th>
								Valor
							</th>
						</tr>
					</thead>
					<tbody>
						{linhasNodes}
	    			</tbody>
				</table>
				);
	}
});

var Linha = React.createClass({
	render: function()
	{
		return(
			<tr>
				<td>{this.props.linha.id}</td>
				<td>{this.props.linha.nome}</td>
				<td>{this.props.linha.origem}</td>
				<td>{this.props.linha.destino}</td>
				<td>{this.props.linha.tempoMedio}</td>
				<td>{this.props.linha.valor}</td>
			</tr>
		);
	}
})

var FormAdicionar = React.createClass({
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		var origem = this.refs.origem.value.trim();
		var destino = this.refs.destino.value.trim();
		var tempoMedio = this.refs.tempoMedio.value.trim();
		var valor = this.refs.valor.value.trim();
		if (!id || !nome || !origem || !destino || !tempoMedio || !valor) {
		  return;
		}
		this.props.onLinhaSubmit(id, nome, {id: id,nome: nome,origem: origem,destino: destino,tempoMedio: tempoMedio,valor: valor});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		this.refs.origem.value = '';
		this.refs.destino.value = '';
		this.refs.tempoMedio.value = '';
		this.refs.valor.value = '';
		return;
	},
	render: function()
	{
		return(
			<form name="adicionar" onSubmit={this.handleSubmit}>
				ID: <input type="text" placeholder="id" ref="id" />
				<br />
				Nome: <input type="text" placeholder="nome" ref="nome" />
				<br />
				Origem: <input type="text" placeholder="origem" ref="origem" />
				<br />
				Destino: <input type="text" placeholder="destino" ref="destino" />
				<br />
				Tempo m&eacute;dio: <input type="text" placeholder="tempoMedio" ref="tempoMedio" />
				<br />
				Valor: <input type="text" placeholder="valor" ref="valor" />
				<br />
				<input type="submit" value="Adicionar" />
			</form>
		);
	}
});

var data = [ {id:"1", nome: "Florida", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:50",valor:"4.50"},
 {id:"2", nome: "Colina", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:30",valor:"4.70"},
 {id:"3", nome: "Sans Souci", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:55",valor:"3.50"}];
//pollInterval={10000}
ReactDOM.render(
		<LinhaBox data={data} pollInterval={200} />,
		document.getElementById('content')
		);