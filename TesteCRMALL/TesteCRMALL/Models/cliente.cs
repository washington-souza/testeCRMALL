using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TesteCrmall.Models
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public int Sexo { get; set; }
        public DateTime DataDeNascimento { get; set; }
        public string Cep { get; set; }
        public string Endereco { get; set; }
        public int? Numero { get; set; }
        public string Complemento { get; set; }
        public string Bairro { get; set; }
        public string Estado { get; set; }
        public string Cidade { get; set; }
    }
}