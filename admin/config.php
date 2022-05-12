<?php

defined('ABSPATH') or die("Bye bye");

function pd_add_menu()
{
    /*  comprueba permisos */
    if (!current_user_can('manage_options')) wp_die(__('No tienes suficientes permisos para acceder a esta página.'));
?>
    <div class="wrap">
        <h2><?php _e('Prog-deco', 'progdeco') ?></h2>
        Bienvenido a la configuración de Prog-Deco!
    </div>
<?php
}
?>