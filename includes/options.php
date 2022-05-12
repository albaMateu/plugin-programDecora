<?php
defined('ABSPATH') or die("Bye bye");

/* crear el menu superior de wp en backoffice */

// El hook admin_menu ejecuta la funcion pd_menu_administrador
add_action('admin_menu', 'pd_menu_administrador');

function pd_menu_administrador()
{
    add_menu_page("ProgDeco", "ProgDeco",  "manage_options", PROGDECO_RUTA . "/admin/config.php", 20);
}
