namespace TesteCrmall.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NumeroAlteration : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Clientes", "Numero", c => c.String(unicode: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Clientes", "Numero", c => c.Int(nullable: false));
        }
    }
}
