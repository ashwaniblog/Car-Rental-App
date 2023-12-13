using Microsoft.EntityFrameworkCore.Migrations;

namespace AshwniCarRental.Business.Migrations
{
    public partial class AddedProducttable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "products",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Car_Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Car_Maker = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Car_Category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Available_Quantity = table.Column<int>(type: "int", nullable: false),
                    Available_Discount = table.Column<double>(type: "float", nullable: false),
                    Image = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rent_Price = table.Column<double>(type: "float", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_products", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "products");
        }
    }
}
