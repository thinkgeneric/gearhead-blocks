<?php

namespace Gearhead\GutenBlocks\Services;
/**
 * Class RegistrationServiceTrait
 *
 * Generic trait to handle registration of post types, shortcodes and widgets
 *
 */
trait RegistrationServiceTrait {


    /**
     * @param $class
     */
    public function register_type($class) {

        // Instantiate the class and register its hooks
        if (class_exists($class)) {
            $post_class = new $class();
            return $post_class->register_hooks();
        }

        if (WP_DEBUG) {
            wp_die(
                sprintf("Error locating <code>%s</code> class to be included in the framework.", $class),
                "Class not found."
            );
        }

        return;
    }
}
