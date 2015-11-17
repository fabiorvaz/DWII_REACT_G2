/**
 * 
 */
var LinhaBox = React.createClass({
	handleDeleteSubmit: function(linha) {
		this.setState({linhaSelecionada: linha});
		
		
		/*
		$.ajax({
			  url: "services/library/book/"+isbn,
			  dataType: 'json',
			  type: 'DELETE',
			  success: function(data) {
				this.setState({data: data});
			  }.bind(this),
			  error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			  }.bind(this)
			});
			*/
			
	},
	handleCancelaSubmit: function(linha) {
		this.setState({linhaSelecionada: []});
	},
	handleConfirmaDeleteSubmit: function(id){
		var rows = this.state.data.filter(function(elem) {
            return elem.id != id;
        });
		this.setState({data:rows, linhaSelecionada: []});
		
	},
	getInitialState: function() {
	    return {data: data, linhaSelecionada: []};
	},
	render: function() {
		return (
			<div>
				<div>
					<FormConfirmar onLinhaSubmit={this.handleConfirmaDeleteSubmit} 
						onCancelaSubmit={this.handleCancelaSubmit} 
						id={this.state.linhaSelecionada.id} 
						nome={this.state.linhaSelecionada.nome} />
				</div>
				<div>
					<LinhaLista data={this.state.data} onLinhaSubmit={this.handleDeleteSubmit} />
				</div>
			</div>
		);
	}
});

var LinhaLista = React.createClass({
	handleDeleteSubmit: function(linha) {
		this.props.onLinhaSubmit(linha);
	},
	render: function() {
		var linhasNodes = this.props.data.map(function(linha)
			{
				return (
					<Linha linha={linha} onLinhaSubmit={this.handleDeleteSubmit} />
				);
			}.bind(this)
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
	handleSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		var nome = this.refs.nome.value.trim();
		if (!id || !nome) {
		  return;
		}
		this.props.onLinhaSubmit({id: id,nome: nome});
		this.refs.id.value = '';
		this.refs.nome.value = '';
		return;
	},
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
				<td>
					<form onSubmit={this.handleSubmit}>
						<input type="hidden" value={this.props.linha.id} ref="id" />
						<input type="hidden" value={this.props.linha.nome} ref="nome" />
						<input type="submit" value="Deletar" />
					</form>
				</td>
			</tr>
		);
	}
})

var FormConfirmar = React.createClass({
	handleConfirmaSubmit: function(e) {
		e.preventDefault();
		var id = this.refs.id.value.trim();
		if (!id) {
		  return;
		}
		this.props.onLinhaSubmit(id);
		this.refs.id.value = '';
		return;
	},
	handleCancelaSubmit: function(e){
		e.preventDefault();
		this.props.onCancelaSubmit();
		this.refs.id.value = '';
		return;
	},
	render: function()
	{
		return(
			<div>
				<form name="ConfirmaDeletar" onSubmit={this.handleConfirmaSubmit}>
					<input type="hidden" value={this.props.id} ref="id" />
					Confirma a remo&ccedil;&atilde;o da linha {this.props.nome}?
					<br />
					ATEN&Ccedil;&Atilde;O: Esta a&ccedil;&atilde;o n&atilde;o poder&aacute; ser desfeita.
					<br />
					<input type="submit" value="Confirma" />
				</form>
				<form name="CancelaDeletar" onSubmit={this.handleCancelaSubmit}>
					<input type="submit" value="Cancela" />
				</form>
			</div>
		);
	}
})

var data = [ {id:"1", nome: "Florida", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:50",valor:"4.50"},
 {id:"2", nome: "Colina", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:30",valor:"4.70"},
 {id:"3", nome: "Sans Souci", origem:"Porto Alegre", destino:"Guaiba", tempoMedio:"1:55",valor:"3.50"}];
 
//pollInterval={10000}
ReactDOM.render(
		<LinhaBox data={data} pollInterval={200} />,
		document.getElementById('content')
		);