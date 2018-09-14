using Microsoft.EntityFrameworkCore.Migrations;

namespace vega.Migrations
{
    public partial class SeedFeatures : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Features 1')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Features 2')");
            migrationBuilder.Sql("INSERT INTO Features (Name) VALUES ('Features 3')");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
