<?php

namespace Gearhead\GutenBlocks\Services;

class GutenbergBlockService {
    use RegistrationServiceTrait;

    public function register_hooks() {
        add_action('enqueue_block_editor_assets', [$this, 'enqueue_block_editor_assets']);
        add_filter('block-categories', [$this, 'register_block_category'], 10, 2);
    }

    protected function vendor_dir() {
        return get_stylesheet_directory_uri() . '/vendor/gearhead/guten-blocks/';
    }

    public function register_blocks($blocks) {
        if (!class_exists('WP_Block_Type')) {
            return;
        }

        $blocks = apply_filters('gearhead/register-blocks', $blocks);

        foreach ($blocks as $block) {
            $this->register_type($block);
        }
    }
    
    public function register_block_category($categories, $post) {
        return array_merge(
            $categories,
            [
                [
                    'slug' => 'gearhead-blocks',
                    'title' => 'Gearhead Blocks',
                ],
            ]
        );
    }

    public function enqueue_block_editor_assets() {
        wp_enqueue_script(
            'gearhead-blocks-js',
            $this->vendor_dir() . '/dist/blocks.build.js',
            ['wp-blocks', 'wp-element', 'wp-components', 'wp-editor']
        );

        wp_enqueue_style(
            'gearhead-blocks-editor-css',
            $this->vendor_dir() . '/dist/blocks.editor.build.css',
            ['wp-edit-blocks']
        );
    }
}
