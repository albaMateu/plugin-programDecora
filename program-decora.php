<?php


/*
Plugin Name: Programar Decoración
Description: Plugin para programar cuando salen bolas de nieve en index o se pinta de morado el footer y header.
Version:1.0
Author:Alba Mateu
Author URI:https://almape.dev
Text Domain: progdeco
*/

defined('ABSPATH') or die("Bye bye");

define('PROGDECO_RUTA', plugin_dir_path(__FILE__));

include(PROGDECO_RUTA . 'includes/options.php');

/* añadimos el css */
function progdeco_styles()
{
    wp_enqueue_style('progdeco',  plugin_dir_url(__FILE__) . '/public/css/styles.css');
}
add_action('wp_enqueue_scripts', 'progdeco_styles');

/* añadimos el js */
function progdeco_js()
{
    wp_enqueue_script('progdeco',  plugin_dir_url(__FILE__) . '/public/scripts/functions.js');
}
add_action('wp_enqueue_scripts', 'progdeco_js');
