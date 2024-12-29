using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MOBİLECARWASHAPISON.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "cw_admins",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_admin__3214EC27232E6ED1", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "cw_services",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    service_name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    price = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_servi__3214EC270660DAEB", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "cw_users",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_users__3214EC27C239F8D5", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "cw_workers",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    phone_number = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    tax_number = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_worke__3214EC27978191B8", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "cw_appointments",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    worker_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    appointment_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    status = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_appoi__3214EC27DDC8BE8D", x => x.ID);
                    table.ForeignKey(
                        name: "FK__cw_appoin__user___7C4F7684",
                        column: x => x.user_id,
                        principalTable: "cw_users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__cw_appoin__worke__7B5B524B",
                        column: x => x.worker_id,
                        principalTable: "cw_workers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cw_feedbacks",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    worker_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    feedback_text = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    rating = table.Column<int>(type: "int", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_feedb__3214EC27E6C2FB3A", x => x.ID);
                    table.ForeignKey(
                        name: "FK__cw_feedba__user___02084FDA",
                        column: x => x.user_id,
                        principalTable: "cw_users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__cw_feedba__worke__02FC7413",
                        column: x => x.worker_id,
                        principalTable: "cw_workers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cw_payments",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    user_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    worker_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    payment_date = table.Column<DateTime>(type: "datetime", nullable: true),
                    payment_method = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_payme__3214EC2746A29270", x => x.ID);
                    table.ForeignKey(
                        name: "FK__cw_paymen__user___75A278F5",
                        column: x => x.user_id,
                        principalTable: "cw_users",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__cw_paymen__worke__76969D2E",
                        column: x => x.worker_id,
                        principalTable: "cw_workers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cw_worker_balances",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    worker_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    balance = table.Column<decimal>(type: "decimal(18,2)", nullable: true, defaultValue: 0m),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_worke__3214EC27827EABB6", x => x.ID);
                    table.ForeignKey(
                        name: "FK__cw_worker__worke__08B54D69",
                        column: x => x.worker_id,
                        principalTable: "cw_workers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "cw_worker_services",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "(newid())"),
                    worker_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    service_id = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    is_active = table.Column<bool>(type: "bit", nullable: true, defaultValue: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__cw_worke__3214EC27D5480297", x => x.ID);
                    table.ForeignKey(
                        name: "FK__cw_worker__servi__123EB7A3",
                        column: x => x.service_id,
                        principalTable: "cw_services",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__cw_worker__worke__114A936A",
                        column: x => x.worker_id,
                        principalTable: "cw_workers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_cw_appointments_user_id",
                table: "cw_appointments",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_appointments_worker_id",
                table: "cw_appointments",
                column: "worker_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_feedbacks_user_id",
                table: "cw_feedbacks",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_feedbacks_worker_id",
                table: "cw_feedbacks",
                column: "worker_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_payments_user_id",
                table: "cw_payments",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_payments_worker_id",
                table: "cw_payments",
                column: "worker_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_worker_balances_worker_id",
                table: "cw_worker_balances",
                column: "worker_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_worker_services_service_id",
                table: "cw_worker_services",
                column: "service_id");

            migrationBuilder.CreateIndex(
                name: "IX_cw_worker_services_worker_id",
                table: "cw_worker_services",
                column: "worker_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "cw_admins");

            migrationBuilder.DropTable(
                name: "cw_appointments");

            migrationBuilder.DropTable(
                name: "cw_feedbacks");

            migrationBuilder.DropTable(
                name: "cw_payments");

            migrationBuilder.DropTable(
                name: "cw_worker_balances");

            migrationBuilder.DropTable(
                name: "cw_worker_services");

            migrationBuilder.DropTable(
                name: "cw_users");

            migrationBuilder.DropTable(
                name: "cw_services");

            migrationBuilder.DropTable(
                name: "cw_workers");
        }
    }
}
