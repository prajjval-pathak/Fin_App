using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BackEnd_API.Migrations
{
    public partial class OneToOneRelationShips : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "3c82834a-0ea5-4c9e-b841-74fe2f1915e2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d0b48793-42d0-4eb3-8301-4e3aa1864b8b");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "bc3bdd6b-a897-46b2-b489-a340e22216be", "cb6abbc9-4536-4d57-a79b-0bf48b5a6d8a", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d714de53-57ab-43f3-8421-3b994760c071", "54812d19-b231-4962-ba97-99511a3a569f", "User", "USER" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bc3bdd6b-a897-46b2-b489-a340e22216be");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "d714de53-57ab-43f3-8421-3b994760c071");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "3c82834a-0ea5-4c9e-b841-74fe2f1915e2", "2507a53b-6d7d-4bae-85f9-83e42afec795", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d0b48793-42d0-4eb3-8301-4e3aa1864b8b", "a0e88634-dc00-48ce-be41-37a09f0ca450", "User", "USER" });
        }
    }
}
