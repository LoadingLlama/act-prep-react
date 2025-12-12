#!/usr/bin/env python3
"""
LaTeX TikZ Diagram Generator
Generates all math diagrams using LaTeX/TikZ for professional quality
Converts to SVG for web display
"""

import subprocess
import os
import shutil

# Create output directories
GEOMETRY_DIR = '../public/images/math/geometry'
ALGEBRA_DIR = '../public/images/math/algebra'
TEMP_DIR = './tikz_temp'

os.makedirs(GEOMETRY_DIR, exist_ok=True)
os.makedirs(ALGEBRA_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

def compile_tikz_to_svg(tikz_code, output_filename):
    """
    Compile TikZ code to SVG
    """
    # Create LaTeX document with no border
    latex_doc = r'''\documentclass[tikz,border=0pt]{standalone}
\usepackage{tikz}
\usepackage{amsmath}
\usetikzlibrary{angles,arrows.meta,calc,decorations.markings,patterns,positioning,quotes}

\begin{document}
''' + tikz_code + r'''
\end{document}
'''

    # Write to temp file
    tex_file = f'{TEMP_DIR}/diagram.tex'
    with open(tex_file, 'w') as f:
        f.write(latex_doc)

    try:
        # Compile LaTeX to PDF
        subprocess.run(
            ['pdflatex', '-interaction=nonstopmode', '-output-directory', TEMP_DIR, tex_file],
            capture_output=True,
            check=True
        )

        # Convert PDF to SVG
        pdf_file = f'{TEMP_DIR}/diagram.pdf'
        subprocess.run(
            ['pdf2svg', pdf_file, output_filename],
            check=True
        )

        print(f'✓ Generated: {output_filename}')
        return True

    except subprocess.CalledProcessError as e:
        print(f'✗ Error generating {output_filename}')
        print(e.stderr.decode() if e.stderr else '')
        return False

# ============================================================================
# GEOMETRY DIAGRAMS
# ============================================================================

def generate_vertical_angles():
    """Generate vertical angles diagram"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.0, line width=1.2pt]
    % Two intersecting lines
    \draw[black!80] (-2.2,0) -- (2.2,0);
    \draw[black!80] (0,-2.2) -- (0,2.2);

    % Mark angles with better placement
    \node[font=\large] at (-0.6, 0.6) {$a$};
    \node[font=\large] at (0.6, 0.6) {$b$};
    \node[font=\large] at (0.6, -0.6) {$c$};
    \node[font=\large] at (-0.6, -0.6) {$d$};

    % Mark the intersection point
    \fill[black] (0,0) circle (1.5pt);
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/vertical-angles.svg')

def generate_parallel_lines_transversal():
    """Generate parallel lines cut by transversal with CORRECT angle numbering"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.1, line width=1.2pt]
    % Parallel lines (horizontal)
    \draw[black!80] (-3.5, 2) -- (3.5, 2);
    \draw[black!80] (-3.5, 0) -- (3.5, 0);

    % Transversal (diagonal line crossing both parallel lines)
    % Top intersection at (-0.5, 2), bottom intersection at (0.5, 0)
    \draw[black!80] (-2.5, -0.5) -- (2.5, 2.5);

    % TOP INTERSECTION angles - placed INSIDE each angle region
    % Angle 1: upper-left (above line, left of transversal)
    \node[font=\normalsize] at (-1.3, 2.35) {1};
    % Angle 2: upper-right (above line, right of transversal)
    \node[font=\normalsize] at (0.3, 2.35) {2};
    % Angle 3: lower-right (below line, right of transversal)
    \node[font=\normalsize] at (0.1, 1.65) {3};
    % Angle 4: lower-left (below line, left of transversal)
    \node[font=\normalsize] at (-1.1, 1.65) {4};

    % BOTTOM INTERSECTION angles - placed INSIDE each angle region
    % Angle 5: upper-left (above line, left of transversal)
    \node[font=\normalsize] at (-0.1, 0.35) {5};
    % Angle 6: upper-right (above line, right of transversal)
    \node[font=\normalsize] at (1.3, 0.35) {6};
    % Angle 7: lower-right (below line, right of transversal)
    \node[font=\normalsize] at (1.1, -0.35) {7};
    % Angle 8: lower-left (below line, left of transversal)
    \node[font=\normalsize] at (-0.3, -0.35) {8};

    % Parallel markers
    \draw[line width=1pt] (3.0, 2.05) -- (3.2, 2.05);
    \draw[line width=1pt] (3.0, 1.95) -- (3.2, 1.95);
    \draw[line width=1pt] (3.0, 0.05) -- (3.2, 0.05);
    \draw[line width=1pt] (3.0, -0.05) -- (3.2, -0.05);
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/parallel-lines-transversal.svg')

def generate_right_triangle():
    """Generate right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.3, line width=1.2pt]
    % Define triangle vertices
    \coordinate (A) at (0, 0);
    \coordinate (B) at (3, 0);
    \coordinate (C) at (0, 2.5);

    % Draw triangle
    \draw[black!80, fill=black!5] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[line width=1pt] (0, 0.18) -- (0.18, 0.18) -- (0.18, 0);

    % Side labels - optimally placed
    \node[below, font=\normalsize] at (1.5, -0.15) {$b$};
    \node[left, font=\normalsize] at (-0.15, 1.25) {$a$};
    \node[above right, font=\normalsize] at (1.6, 1.3) {$c$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/right-triangle.svg')

def generate_45_45_90_triangle():
    """Generate 45-45-90 special right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.4, line width=1.2pt]
    % Define triangle vertices (isosceles right triangle)
    \coordinate (A) at (0, 0);
    \coordinate (B) at (2.5, 0);
    \coordinate (C) at (0, 2.5);

    % Draw triangle
    \draw[black!80, fill=black!5] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[line width=1pt] (0, 0.2) -- (0.2, 0.2) -- (0.2, 0);

    % Angle markers - optimally placed
    \node[font=\small] at (0.5, 0.12) {$45°$};
    \node[font=\small] at (2.0, 0.25) {$45°$};

    % Side labels - clean placement
    \node[below, font=\normalsize] at (1.25, -0.15) {$x$};
    \node[left, font=\normalsize] at (-0.15, 1.25) {$x$};
    \node[above right, font=\normalsize] at (1.3, 1.35) {$x\sqrt{2}$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/triangle-45-45-90.svg')

def generate_30_60_90_triangle():
    """Generate 30-60-90 special right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.2, line width=1.2pt]
    % Define triangle vertices
    \coordinate (A) at (0, 0);
    \coordinate (B) at (2.5, 0);
    \coordinate (C) at (0, 4.33);  % sqrt(3) * 2.5

    % Draw triangle
    \draw[black!80, fill=black!5] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[line width=1pt] (0, 0.2) -- (0.2, 0.2) -- (0.2, 0);

    % Angle markers - optimally placed
    \node[font=\small] at (1.8, 0.2) {$30°$};
    \node[font=\small] at (0.25, 3.8) {$60°$};

    % Side labels - clean placement
    \node[below, font=\normalsize] at (1.25, -0.15) {$x\sqrt{3}$};
    \node[left, font=\normalsize] at (-0.2, 2.15) {$2x$};
    \node[above right, font=\normalsize] at (1.3, 2.2) {$x$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/triangle-30-60-90.svg')

# ============================================================================
# ALGEBRA DIAGRAMS
# ============================================================================

def generate_standard_parabola():
    """Generate standard parabola y = x^2"""
    tikz_code = r'''
\begin{tikzpicture}[scale=0.85, line width=1.2pt]
    % Axes
    \draw[->, line width=1pt] (-3.2, 0) -- (3.2, 0) node[right, font=\small] {$x$};
    \draw[->, line width=1pt] (0, -0.3) -- (0, 4.2) node[above, font=\small] {$y$};

    % Grid - lighter
    \draw[gray!20, very thin] (-3, 0) grid (3, 4);

    % Parabola
    \draw[black!70, very thick, smooth, domain=-2.5:2.5, samples=80]
        plot (\x, {\x*\x});

    % Vertex
    \fill[black] (0, 0) circle (2pt);
    \node[below right, font=\footnotesize] at (0.15, 0.1) {$(0, 0)$};

    % Axis of symmetry - subtle
    \draw[black!40, dashed, line width=0.8pt] (0, 0) -- (0, 4);
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{ALGEBRA_DIR}/parabola-standard.svg')

def generate_parabola_vertex_form():
    """Generate parabola showing vertex form"""
    tikz_code = r'''
\begin{tikzpicture}[scale=0.75, line width=1.2pt]
    % Axes
    \draw[->, line width=1pt] (-0.8, 0) -- (4.8, 0) node[right, font=\small] {$x$};
    \draw[->, line width=1pt] (0, -0.3) -- (0, 5.5) node[above, font=\small] {$y$};

    % Grid - lighter
    \draw[gray!20, very thin] (0, 0) grid (4.5, 5);

    % Reference parabola y = x^2 - subtle
    \draw[gray!50, thick, dashed, smooth, domain=-0.5:0.5, samples=40]
        plot (\x, {\x*\x});

    % Shifted parabola y = (x-2)^2 + 1
    \draw[black!70, very thick, smooth, domain=0.3:3.7, samples=80]
        plot (\x, {(\x-2)*(\x-2) + 1});

    % Vertices
    \fill[gray!50] (0, 0) circle (1.5pt);
    \node[below left, gray!70, font=\footnotesize] at (0, 0) {$(0, 0)$};

    \fill[black] (2, 1) circle (2pt);
    \node[above right, font=\footnotesize] at (2.1, 1.1) {$(2, 1)$};

    % Axis of symmetry - subtle
    \draw[black!40, dashed, line width=0.8pt] (2, 0.3) -- (2, 5);
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{ALGEBRA_DIR}/parabola-vertex-form.svg')

def generate_parabola_direction():
    """Generate parabolas opening up and down"""
    tikz_code = r'''
\begin{tikzpicture}[scale=0.75, line width=1.2pt]
    % Axes
    \draw[->, line width=1pt] (-3.5, 0) -- (3.5, 0) node[right, font=\small] {$x$};
    \draw[->, line width=1pt] (0, -4.5) -- (0, 4.5) node[above, font=\small] {$y$};

    % Grid - lighter
    \draw[gray!20, very thin] (-3, -4) grid (3, 4);

    % Parabola opening up (y = x^2)
    \draw[black!70, very thick, smooth, domain=-2.3:2.3, samples=70]
        plot (\x, {\x*\x});

    % Parabola opening down (y = -x^2)
    \draw[black!70, very thick, smooth, domain=-2.3:2.3, samples=70]
        plot (\x, {-\x*\x});

    % Vertex marker
    \fill[black] (0, 0) circle (2pt);

    % Labels - clean placement
    \node[font=\normalsize] at (1.8, 3.2) {$y = x^2$};
    \node[font=\footnotesize, gray!70] at (1.8, 2.7) {$(a > 0)$};

    \node[font=\normalsize] at (1.8, -3.2) {$y = -x^2$};
    \node[font=\footnotesize, gray!70] at (1.8, -2.7) {$(a < 0)$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{ALGEBRA_DIR}/parabola-direction.svg')

# ============================================================================
# Main execution
# ============================================================================
if __name__ == '__main__':
    print('Generating ACT Math Diagrams with TikZ...')
    print('=' * 60)

    # Check for required tools
    try:
        subprocess.run(['pdflatex', '--version'], capture_output=True, check=True)
        subprocess.run(['pdf2svg'], capture_output=True, check=False)
    except FileNotFoundError as e:
        print('Error: Required tools not found.')
        print('Please install: pdflatex (TeXLive/MacTeX) and pdf2svg')
        print('On macOS: brew install --cask mactex')
        print('          brew install pdf2svg')
        exit(1)

    print('\n[Geometry Diagrams]')
    generate_vertical_angles()
    generate_parallel_lines_transversal()
    generate_right_triangle()
    generate_45_45_90_triangle()
    generate_30_60_90_triangle()

    print('\n[Algebra Diagrams]')
    generate_standard_parabola()
    generate_parabola_vertex_form()
    generate_parabola_direction()

    # Cleanup temp files
    if os.path.exists(TEMP_DIR):
        shutil.rmtree(TEMP_DIR)

    print('=' * 60)
    print(f'Geometry diagrams saved to: {GEOMETRY_DIR}/')
    print(f'Algebra diagrams saved to: {ALGEBRA_DIR}/')
    print('Total diagrams: 8')
