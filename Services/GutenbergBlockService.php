<?php

namespace Gearhead\GutenBlocks\Services;

class GutenbergBlockService {
    use RegistrationServiceTrait;

    public function register_blocks($blocks) {
        if (!class_exists('WP_Block_Type')) {
            return;
        }

        // Register core block script
        wp_register_script(
            'gutenberg-card-block',
            get_stylesheet_directory_uri() . '/dist/blocks/blocks.build.js', // todo this will not resolve correctly
            ['wp-blocks', 'wp-element', 'wp-data', 'wp-core-data', 'wp-editor']
        );

        $blocks = apply_filters('gearhead/register-blocks', $blocks);

        foreach ($blocks as $block) {
            $this->register_type($block);
        }
    }
}
