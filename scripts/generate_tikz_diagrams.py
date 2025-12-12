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
    # Create LaTeX document
    latex_doc = r'''\documentclass[tikz,border=10pt]{standalone}
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
\begin{tikzpicture}[scale=1.5, line width=1.5pt]
    % Two intersecting lines
    \draw[blue!70!black] (-2,0) -- (2,0);
    \draw[blue!70!black] (0,-2) -- (0,2);

    % Mark angles
    \node[font=\Large\bfseries] at (-0.5, 0.5) {$a$};
    \node[font=\Large\bfseries] at (0.5, 0.5) {$b$};
    \node[font=\Large\bfseries] at (0.5, -0.5) {$c$};
    \node[font=\Large\bfseries] at (-0.5, -0.5) {$d$};

    % Mark the intersection point
    \fill (0,0) circle (2pt);

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (0, 2.5) {Vertical Angles};

    % Caption
    \node[font=\small, gray] at (0, -2.5) {$a = c$ and $b = d$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/vertical-angles.svg')

def generate_parallel_lines_transversal():
    """Generate parallel lines cut by transversal"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.2, line width=1.5pt]
    % Parallel lines
    \draw[blue!70!black] (-3, 2) -- (3, 2);
    \draw[blue!70!black] (-3, 0) -- (3, 0);

    % Transversal
    \draw[red!70!black] (-2, -0.5) -- (2, 2.5);

    % Intersection points
    \coordinate (A) at (-0.8, 2);
    \coordinate (B) at (0.8, 0);

    % Mark angles at top intersection
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (-1.1, 2.2) {1};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (-0.5, 2.2) {2};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (-0.5, 1.8) {3};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (-1.1, 1.8) {4};

    % Mark angles at bottom intersection
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (0.5, 0.2) {5};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (1.1, 0.2) {6};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (1.1, -0.2) {7};
    \node[font=\normalsize\bfseries, fill=white, inner sep=1pt] at (0.5, -0.2) {8};

    % Parallel markers
    \draw[very thick] (2.5, 2.1) -- (2.6, 2.1);
    \draw[very thick] (2.5, 1.9) -- (2.6, 1.9);
    \draw[very thick] (2.5, 0.1) -- (2.6, 0.1);
    \draw[very thick] (2.5, -0.1) -- (2.6, -0.1);

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (0, 3.2) {Parallel Lines \& Transversal};

    % Caption
    \node[font=\small, gray, align=center] at (0, -1) {
        Corresponding: $\angle1=\angle5$, $\angle2=\angle6$ \\
        Alternate Interior: $\angle3=\angle6$, $\angle4=\angle5$
    };
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/parallel-lines-transversal.svg')

def generate_right_triangle():
    """Generate right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=2, line width=1.5pt]
    % Define triangle vertices
    \coordinate (A) at (0, 0);
    \coordinate (B) at (3, 0);
    \coordinate (C) at (0, 2);

    % Draw triangle
    \draw[blue!70!black, fill=blue!10] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[thick] (0, 0.15) -- (0.15, 0.15) -- (0.15, 0);

    % Labels
    \node[below left] at (A) {$A$};
    \node[below right] at (B) {$B$};
    \node[above left] at (C) {$C$};

    % Side labels
    \node[below] at (1.5, 0) {$b$};
    \node[left] at (0, 1) {$a$};
    \node[above right] at (1.5, 1) {$c$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (1.5, 2.8) {Right Triangle};

    % Caption
    \node[font=\normalsize, gray] at (1.5, -0.7) {$a^2 + b^2 = c^2$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/right-triangle.svg')

def generate_45_45_90_triangle():
    """Generate 45-45-90 special right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=2.5, line width=1.5pt]
    % Define triangle vertices (isosceles right triangle)
    \coordinate (A) at (0, 0);
    \coordinate (B) at (2, 0);
    \coordinate (C) at (0, 2);

    % Draw triangle
    \draw[blue!70!black, fill=green!10] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[thick] (0, 0.2) -- (0.2, 0.2) -- (0.2, 0);

    % Angle markers
    \node[font=\small] at (0.4, 0.15) {$45°$};
    \node[font=\small] at (1.6, 0.3) {$45°$};
    \node[font=\small] at (0.15, 1.6) {$90°$};

    % Side labels
    \node[below] at (1, 0) {$x$};
    \node[left] at (0, 1) {$x$};
    \node[above right] at (1, 1.1) {$x\sqrt{2}$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (1, 2.8) {45-45-90 Triangle};

    % Caption
    \node[font=\small, gray] at (1, -0.6) {Sides: $x : x : x\sqrt{2}$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/triangle-45-45-90.svg')

def generate_30_60_90_triangle():
    """Generate 30-60-90 special right triangle"""
    tikz_code = r'''
\begin{tikzpicture}[scale=2.5, line width=1.5pt]
    % Define triangle vertices
    \coordinate (A) at (0, 0);
    \coordinate (B) at (2, 0);
    \coordinate (C) at (0, 3.464);  % sqrt(3) * 2

    % Draw triangle
    \draw[blue!70!black, fill=orange!10] (A) -- (B) -- (C) -- cycle;

    % Right angle marker
    \draw[thick] (0, 0.2) -- (0.2, 0.2) -- (0.2, 0);

    % Angle markers
    \node[font=\small] at (0.15, 0.5) {$90°$};
    \node[font=\small] at (1.5, 0.25) {$30°$};
    \node[font=\small] at (0.3, 3.0) {$60°$};

    % Side labels
    \node[below] at (1, 0) {$x\sqrt{3}$};
    \node[left] at (0, 1.7) {$2x$};
    \node[above right] at (1, 1.8) {$x$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (1, 4.2) {30-60-90 Triangle};

    % Caption
    \node[font=\small, gray] at (1, -0.6) {Sides: $x : x\sqrt{3} : 2x$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{GEOMETRY_DIR}/triangle-30-60-90.svg')

# ============================================================================
# ALGEBRA DIAGRAMS
# ============================================================================

def generate_standard_parabola():
    """Generate standard parabola y = x^2"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.2, line width=1.5pt]
    % Axes
    \draw[->] (-3.5, 0) -- (3.5, 0) node[right] {$x$};
    \draw[->] (0, -0.5) -- (0, 5) node[above] {$y$};

    % Grid
    \draw[gray!30, thin] (-3, -0) grid (3, 4);

    % Parabola
    \draw[blue!70!black, very thick, smooth, domain=-2.8:2.8, samples=100]
        plot (\x, {\x*\x});

    % Vertex
    \fill[red] (0, 0) circle (3pt);
    \node[below right, red, font=\small\bfseries] at (0.1, 0.1) {Vertex $(0, 0)$};

    % Axis of symmetry
    \draw[blue, dashed, thick] (0, -0.3) -- (0, 4.5);
    \node[blue, font=\small] at (0.5, 4.2) {$x = 0$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (0, 5.5) {$y = x^2$};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{ALGEBRA_DIR}/parabola-standard.svg')

def generate_parabola_vertex_form():
    """Generate parabola showing vertex form"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.0, line width=1.5pt]
    % Axes
    \draw[->] (-1, 0) -- (5, 0) node[right] {$x$};
    \draw[->] (0, -0.5) -- (0, 6) node[above] {$y$};

    % Grid
    \draw[gray!30, thin] (-1, 0) grid (5, 6);

    % Reference parabola y = x^2
    \draw[gray, thick, dashed, smooth, domain=-0.8:0.8, samples=50]
        plot (\x, {\x*\x});

    % Shifted parabola y = (x-2)^2 + 1
    \draw[blue!70!black, very thick, smooth, domain=0.2:3.8, samples=100]
        plot (\x, {(\x-2)*(\x-2) + 1});

    % Vertices
    \fill[gray] (0, 0) circle (2pt);
    \node[below left, gray, font=\small] at (0, 0) {$(0, 0)$};

    \fill[red] (2, 1) circle (3pt);
    \node[above right, red, font=\small\bfseries] at (2.1, 1.1) {Vertex $(2, 1)$};

    % Axis of symmetry
    \draw[blue, dashed, thick] (2, 0) -- (2, 5.5);
    \node[blue, font=\small] at (2, 5.8) {$x = 2$};

    % Legend
    \node[gray, font=\small] at (4, 5.5) {$y = x^2$};
    \node[blue!70!black, font=\normalsize\bfseries] at (4, 5) {$y = (x-2)^2 + 1$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (2.5, 6.8) {Vertex Form};
\end{tikzpicture}
'''
    compile_tikz_to_svg(tikz_code, f'{ALGEBRA_DIR}/parabola-vertex-form.svg')

def generate_parabola_direction():
    """Generate parabolas opening up and down"""
    tikz_code = r'''
\begin{tikzpicture}[scale=1.0, line width=1.5pt]
    % Axes
    \draw[->] (-3.5, 0) -- (3.5, 0) node[right] {$x$};
    \draw[->] (0, -5) -- (0, 5) node[above] {$y$};

    % Grid
    \draw[gray!30, thin] (-3, -4) grid (3, 4);

    % Parabola opening up (y = x^2)
    \draw[blue!70!black, very thick, smooth, domain=-2.5:2.5, samples=100]
        plot (\x, {\x*\x});

    % Parabola opening down (y = -x^2)
    \draw[red!70!black, very thick, smooth, domain=-2.5:2.5, samples=100]
        plot (\x, {-\x*\x});

    % Vertices
    \fill[blue] (0, 0) circle (3pt);
    \node[right, blue, font=\small\bfseries] at (0.3, 0.3) {Min};

    \fill[red] (0, 0) circle (3pt);
    \node[right, red, font=\small\bfseries] at (0.3, -0.3) {Max};

    % Labels
    \node[blue!70!black, font=\normalsize\bfseries] at (2, 3.5) {$y = x^2$};
    \node[blue!70!black, font=\small] at (2, 3) {$(a > 0)$};

    \node[red!70!black, font=\normalsize\bfseries] at (2, -3.5) {$y = -x^2$};
    \node[red!70!black, font=\small] at (2, -3) {$(a < 0)$};

    % Title
    \node[font=\Large\bfseries, blue!70!black] at (0, 5.8) {Parabola Direction};
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
